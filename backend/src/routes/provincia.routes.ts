import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Listar todas as províncias
router.get('/', async (req, res) => {
  try {
    const provincias = await prisma.provincia.findMany();
    res.json(provincias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar províncias' });
  }
});

// Buscar uma província específica
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const provincia = await prisma.provincia.findUnique({
      where: { id: Number(id) },
      include: { municipios: true }
    });
    
    if (!provincia) {
      return res.status(404).json({ error: 'Província não encontrada' });
    }
    
    res.json(provincia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar província' });
  }
});

// Criar uma nova província
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;
    
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    const provincia = await prisma.provincia.create({
      data: { nome }
    });
    
    res.status(201).json(provincia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar província' });
  }
});

// Atualizar uma província
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    const provincia = await prisma.provincia.update({
      where: { id: Number(id) },
      data: { nome }
    });
    
    res.json(provincia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar província' });
  }
});

// Deletar uma província
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.provincia.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar província' });
  }
});

export default router; 