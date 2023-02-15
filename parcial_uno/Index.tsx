import React from 'react'
import { View, Text, StyleSheet,TextInput,Image} from 'react-native'
import { useEffect, useState} from 'react';
import { reqApi} from './Import';
// import Input from './component';


function Index() {
 
  const [ability,setAbility] = useState("");
  const [name,setName] = useState("");
  const [image,setImage] = useState("");
  const [value, setValue] = useState("");

  const waitPlease = async (input_pokemon) =>{
    const pokemon:string = input_pokemon //se consigue el texto del input
    const pokemon_lowercase:string = pokemon.toLowerCase() //se normaliza el texto para que no cause errores(minusculas)

 
    try{
      
      const {data} = await reqApi.get(pokemon_lowercase); //se hace la llamada a la api
      const {abilities} = data; //se agarra la propiedad abilities del objeto data
      const {name} = data; //se agarra la propiedad name del objeto data
      const {sprites:{front_default:imagen}} = data; //se agarra la sprites y de ahi la imagen abilities del objeto data

      var habilidades:string = ""; //se crea string vacio para anexar las habilidades

      abilities.forEach(element => {
        habilidades += element.ability.name+" ";
      });//se recorre el arreglo de abilites para anexarlas en un string

      setImage(imagen); //se le asigna la imagen a la variable image
      setName("Nombre del Pokemon: "+name); //se le asigna el nombre a la variable name
      setAbility("Habilidades: "+habilidades); //se le asigna el string de habilidades a la variable abilty
      
    }catch({message}){
      setName(message);
      setAbility(message);
    }  
    
  }
  
return (
  
    <View>
       
        <TextInput style={styles.input}
          placeholder='Nombre'
          value={value}
          onSubmitEditing={(event) => waitPlease(event.nativeEvent.text)}
          onChangeText={setValue}
        />

        <Image style={{ width: 300, height: 300 }} source={{ uri: `${image}` }}></Image>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{ability}</Text>  
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    color:'black',
    fontSize:20,
    marginTop:15
  },
  input:{
    fontSize:25,
  }
});
export default Index