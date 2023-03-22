import {DataTypes, Model} from 'sequelize';
import sequelize from "../../config/database";
import Role from "./role";
import bcrypt from "bcrypt";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public roleId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly role?: Role;

    public async getRole(): Promise<Role> {
        return await Role.findByPk(this.roleId);
    }


    static async hashPassword(password: any) {
        return await bcrypt.hash(password, 10).then((hash) => {
            console.log(hash);
            return hash;
        });
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'users',
    sequelize,
});
User.belongsTo(Role, {foreignKey: 'roleId'});
export {User};
