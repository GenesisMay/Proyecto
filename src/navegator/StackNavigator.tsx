import React, { useState } from 'react'
import { PRIMARY_COLOR } from '../commons/constans';
import { WelcomeScreen } from '../screen/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screen/LoginScreen';
import { RegisterScreen } from '../screen/RegisterScreen';
import { HomeScreen } from '../screen/HomeScreen/HomeScreen';
import { ProductScreen } from '../screen/ProductScreen/ProductScreen';

export interface User {
    id: number;
    email: string;
    password: string;
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const users: User[] = [
    { id: 1, email: 'heydi@gmail.com', password: '123456' },
    { id: 2, email: 'genesis@gmail.com', password: '101010' }
];

const [listUsers, setListUsers] = useState(users);

const handleAddUser = (user: User) => {
    setListUsers([...listUsers, user]);
}

    return (
    <Stack.Navigator
    screenOptions={{
        cardStyle:{
            backgroundColor:PRIMARY_COLOR
        }
    }}>
        
        <Stack.Screen name="WelcomeScreen" 
        options={{ headerShown: false }} 
        children={()=><WelcomeScreen/>}/> 

        <Stack.Screen name="LoginScreen" 
        options={{ headerShown: false }} 
        children={()=><LoginScreen users={listUsers}/>}/> 

        <Stack.Screen name="RegisterScreen" 
        options={{ headerShown: false }} 
        children={()=><RegisterScreen users={listUsers} 
        handleAddUser={handleAddUser}/>} />
        
        <Stack.Screen
                name='HomeScreen'
                options={{ headerShown: false }}
                component={HomeScreen} />
        
        <Stack.Screen
                name='Productos'
                options={{ headerShown: false }}
                component={ProductScreen} />
    </Stack.Navigator>
    );
}