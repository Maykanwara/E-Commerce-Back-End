











         id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            PrimaryKey: true,
            autoIncrement: true,
            },

            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            price: {
                type:DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    isDecimal: true,
                },
            },

            stock: {
                type:DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 10,
                validate: {
                    isNumeric: true,
                },
            },
            
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'category',
                    key: 'id',
    
                },
            },
    
        },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'product',
        },
        );
    
        module.exports = product;
    
    
    
    
        

        

















        
        