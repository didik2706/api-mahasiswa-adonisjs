import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Mahasiswa from 'App/Models/Mahasiswa'

export default class MahasiswasController {
  public async index ({}: HttpContextContract) {
    const mhs = await Mahasiswa.query().select('nim', 'nama', 'prodi')

    return {
      status: 'success',
      message: 'data successfully retrieved',
      data: mhs
    }
  }

  public async store ({request, response}: HttpContextContract) {
    let data = request.body();

    const MahasiswaSchema = schema.create({
      nim: schema.number([
        rules.unique({
          table: 'mahasiswa',
          column: 'nim'
        })
      ]),
      nama: schema.string({
        trim: true
      }),
      email: schema.string({
        trim: true
      }, [
        rules.email(),
        rules.unique({
          table: 'mahasiswa',
          column: 'email'
        })
      ]),
      prodi: schema.enum([
        'Informatika', 'Teknologi Informasi', 'Sistem Informasi', 'Teknik Elektro', 'Rekayasa Perangkat Lunak'
      ] as const)
    })

    try {
      const payload = await request.validate({
        schema: MahasiswaSchema
      })

      Mahasiswa.create({
        nim: data.nim,
        nama: data.nama,
        email: data.email,
        prodi: data.prodi,
      })
  
      response.status(201);
      return {
        status: 'success',
        message: 'Data successfully added',
        data: payload
      }
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    const mhs = await Mahasiswa.find(params.id);

    if (mhs !== null) {
      return {
        status: 'success',
        message: 'data successfully retrieved',
        data: mhs
      }
    } else {
      response.status(404);
      return {
        status: 'error',
        message: 'data not found'
      }
    }
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
