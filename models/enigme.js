export default (sequelize, DataTypes) => {
  return sequelize.define("Enigme", {
    enigme: { 
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
    date: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};