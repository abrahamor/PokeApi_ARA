import React from 'react'
import { View, Text, StyleSheet,TextInput,AppRegistry} from 'react-native'
import { useEffect, useState,Component} from 'react';
import { reqApi} from './Import';
// import Input from './component';
// ,wait2SecondsAsync 

function Index() {
  // const nose = Input.poke
  // console.log(nose)
  const [ability,setAbility] = useState("");
  const [name,setName] = useState("");
  const [value, setValue] = useState("");

  const waitPlease = async (input_pokemon) =>{
    // console.log(nombreIntroducido)
    const pokemon:string = input_pokemon
    const pokemon_lowercase:string = pokemon.toLowerCase()

    // try{ 
    //   const result = await wait2SecondsAsync(input_pokemon);
    //   setTest(`then: ${result}`);
    // }catch(error){
    //   setTest(`catch: ${error}`)
    // }
    try{
      //  const {data} = await reqApi.get(pokemon_lowercase);
      //  const {} = data 

      const {data:{abilities:user2}} = await reqApi.get(pokemon_lowercase);
      const {data:{name:nombre}} = await reqApi.get(pokemon_lowercase);
      // var {} = user2 //1:{ability:{name:nombre2}}
      // const len = user2.length;
      // const num:number = 1;
      var abilities:string = "";

      user2.forEach(element => {
        abilities += element.ability.name+" ";
      //  console.log(element.ability.name)
      });
      // for (let index:number = 0; index < len; index++) {
      //  const {1:{ability:{name:nombre2}}} = user2 
      //   console.log(nombre2)
      // }
      // for (let index = 0; index < len; index++) {
      //   var {data:{abilities:{1:{ability:{name:nombre2}}}}} = await reqApi.get("/pokemon/bulbasaur");
      //   console.log(nombre2)
      // }
      var string = abilities.split('"').pop
      setName("Pokemon: "+nombre);
      setAbility("Habilidades: "+abilities);
      
    }catch({message}){
      setName(message);
      setAbility(message);
    }  
    
  }
  useEffect(()=>{
    waitPlease(true);
  },[])
  {/*{JSON.stringify(ability, null, 2)} */}
return (
  
    <View>
       
        <TextInput style={styles.input}
          placeholder='Nombre'
          value={value}
          onSubmitEditing={(event) => waitPlease(event.nativeEvent.text)}
          onChangeText={setValue}
        />
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