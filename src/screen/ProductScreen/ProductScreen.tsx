import React, { useState } from 'react'
import {FlatList, Text, View } from 'react-native'
import { TitleComponent } from '../../components/TitleComponent'
import { styles } from '../../theme/appTheme';
import { SECUNDARY_COLOR } from '../../commons/constans';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardProduct } from '../HomeScreen/components/CardProduct';
import { ModalCar } from '../HomeScreen/components/ModalCar';

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}

export const ProductScreen = () => {
    const products: Product[] = [
        { id: 1, name: 'Vestido Gala', price: 74.70, stock: 5, pathImage: 'https://taty.com.ec/wp-content/uploads/2024/08/taty_vestido_qd5196a_1-768x1024.jpg'},
        { id: 2, name: 'Vestido Primaveral', price: 84.60, stock: 3, pathImage: 'https://taty.com.ec/wp-content/uploads/2024/08/taty_vestido_dce13854_1-768x1024.jpg' },
        { id: 3, name: 'Vestido Noelia', price: 109.00, stock: 2, pathImage: 'https://ivannyboutique.com/30175-large_default/vestido-noelia.jpg' },
        { id: 4, name: 'Vestido Berta', price: 142.50, stock: 0, pathImage: 'https://ivannyboutique.com/30052-large_default/vestido-berta.jpg' },
        { id: 5, name: 'Falda Verde', price: 59.00, stock: 9, pathImage: 'https://ivannyboutique.com/29424-large_default/falda-alicia-verde.jpg' },
        { id: 6, name: 'Falda Menta', price: 59.00, stock: 6, pathImage: 'https://ivannyboutique.com/27941-large_default/falda-alicia-menta.jpg' },
        { id: 7, name: 'Saco Naranja', price: 39.00, stock: 1, pathImage: 'https://ivannyboutique.com/22132-large_default/saco-laura-naranja.jpg' },
        { id: 8, name: 'Zapatos Corina', price: 58.60, stock: 3, pathImage: 'https://ivannyboutique.com/29221-large_default/zapatos-corina.jpg' },
        { id: 9, name: 'Vestido azul', price: 39.00, stock: 1, pathImage: 'https://acdn.mitiendanube.com/stores/001/943/426/products/40306b64-a7a1-406f-99c1-75ab83cf32741-546f03b5190658f22016940113110907-320-0.webp' },
        { id: 10, name: 'Pantalon rojo', price: 58.60, stock: 3, pathImage: 'https://acdn.mitiendanube.com/stores/001/943/426/products/e065490f-a5b3-4aa6-a292-1491c1df42d51-d05fc9d0766ee65d1c16850698204795-320-0.webp' },
    ];
    
    const [productsState, setProductsState] = useState(products);

    const [car, setCar] = useState<Car[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const changeStockProduct = (idProduct: number, quantity: number) => {
        const updateStock = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);
            
        setProductsState(updateStock);
        addProduct(idProduct, quantity);
    }

    const addProduct = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);
        if (!product) {
            return;
        }
        const existing = car.find(item => item.id === idProduct);

        if (existing) {
            const updatedCar = car.map(item => 
                item.id === idProduct 
                ? { ...item, totalQuantity: item.totalQuantity + quantity }
                : item
            );

            setCar(updatedCar);
            
        } else {
        const newProductCar: Car = {
            id: product.id,
            name: product.name,
            price: product.price,
            totalQuantity: quantity
        }
        setCar([...car, newProductCar]);

        }
    };

    const carIcon= () => {
        if (car.length > 0) {
            setShowModal(!showModal);
        }
    };

    return (
        <View style={styles.containerHome}>
            <View style={styles.contentHeaderHome}>

                <TitleComponent title='Productos' />

                <View style={styles.iconCardHome}>
                    <Text style={styles.textIconCard}>{car.length}</Text>
                    <Icon
                        name='shopping-cart'
                        size={35}
                        color={car.length > 0 ? SECUNDARY_COLOR : '#dddfe4'}
                        onPress={() => {
                            if (car.length > 0) {
                                setShowModal(true);
                            }
                        }}
                        disabled={car.length === 0} />
                </View>

            </View>
                <FlatList data={productsState}
                    renderItem={({ item }) => <CardProduct product={item} changeStockProduct={changeStockProduct} />}
                    keyExtractor={item => item.id.toString()} />

            <ModalCar 
            isVisible={showModal} car={car} 
            setShowModal={() => setShowModal(!showModal)} 
            cleanCar={setCar}/>
        </View>
    )
}

