const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient.PrismaClient();
const fs = require('fs');

const perfis = fs.readFileSync('./prisma/perfis.csv', 'utf-8');
const usuarios = fs.readFileSync('./prisma/usuarios.csv', 'utf-8');
const equipamentos = fs.readFileSync('./prisma/equipamentos.csv', 'utf-8');
const comentarios = fs.readFileSync('./prisma/comentarios.csv', 'utf-8');

async function main() {
    await perfis.split('\r\n').map((line, i) => {
        if (i !== 0) {
            const [id,perfil] = line.split(';');
            return prisma.perfil.create({
                data: {
                    id: Number(id),
                    perfil
                }
            
            });
        }
    });
    await usuarios.split('\r\n').map((line, i) => {
        if (i !== 0) {
            const [id,senha,perfil] = line.split(';');
            return prisma.perfil.create({
                data: {
                    id: Number(id),
                    senha,
                    perfil: Number(perfil)
                }
            
            });
        }
        });
        await equipamentos.split('\r\n').map((line, i) => {
        if (i !== 0) {
            const [id,equipamento,imagem,descricao,ativo,data] = line.split(';');
            return prisma.perfil.create({
                data: {
                    id: Number(id),
                    equipamento,
                    imagem,
                    descricao,
                    ativo: Number(ativo),
                    data: new Date(data)
                }
            
            });
        }
        });
        await comentarios.split('\r\n').map((line, i) => {
        if (i !== 0) {
            const [id,comentario,equipamento,perfil,data] = line.split(';');
            return prisma.perfil.create({
                data: {
                    id: Number(id),
                    comentario,
                    equipamento: Number(equipamento),
                    perfil: Number(perfil),
                    data: new Date(data)
                    
                }
            
            });
        }
        });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log('Seeding finalizado!');
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });