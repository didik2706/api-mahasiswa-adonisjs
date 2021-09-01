import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator';
import Mahasiswa from 'App/Models/Mahasiswa'

export default class MahasiswasController {
  public async index ({response}: HttpContextContract) {
    const mhs = await Mahasiswa.query().select('nim', 'nama', 'prodi')

    return response.status(200).send({
      status: 'success',
      message: 'data successfully retrieved',
      data: mhs
    })
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

    if (mhs) {
      return response.send({
        status: 'success',
        message: 'data successfully retrieved',
        data: mhs
      })
    } else {
      return response.status(404).send({
        status: 'error',
        message: 'data not found'
      })
    }
  }

  public async update ({request, params}: HttpContextContract) {
    await validator.validate({
      schema: schema.create({
        nim: schema.number.optional([
          rules.unique({ table: 'mahasiswa', column: 'nim' })
        ]),
        nama: schema.string.optional({
          trim: true
        }),
        email: schema.string.optional({
          trim: true
        }, [
          rules.email(),
          rules.unique({ table: 'mahasiswa', column: 'email' })
        ]),
        prodi: schema.enum.optional(['Informatika', 'Teknologi Informasi', 'Sistem Informasi', 'Rekayasa Perangkat Lunak', 'Teknik Elektro'] as const)
      }),
      data: request.body(),
      messages: {
        email: 'format email tidak sesuai'
      }
    })

    const mahasiswa = await Mahasiswa.findOrFail(params.id)
    
    mahasiswa.nim = request.body().nim;
    mahasiswa.nama = request.body().nama;
    mahasiswa.email = request.body().email;
    mahasiswa.prodi = request.body().prodi;

    await mahasiswa.save()

    return {
      status: 'success',
      message: 'data successfully updated',
      mahasiswa
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    const mhs = await Mahasiswa.findOrFail(params.id);
    await mhs.delete();

    return response.status(202).send({
      status: 'success',
      message: 'data successfully deleted'
    })
  }
}
