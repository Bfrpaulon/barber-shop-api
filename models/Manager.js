const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adiciona um método para verificar a senha
managerSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Pré-processamento para hash da senha antes de salvar no banco de dados
managerSchema.pre('save', async function(next) {
  const manager = this;
  if (manager.isModified('password') || manager.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(manager.password, 10);
      manager.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
