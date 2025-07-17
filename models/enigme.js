
export default (sequelize, DataTypes) => {
  return sequelize.define("Enigme", {
    question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  indice: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reponse: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  });
};