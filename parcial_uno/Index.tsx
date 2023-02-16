import React from 'react'
import { View, Text, StyleSheet,TextInput,Image} from 'react-native'
import { useEffect, useState} from 'react';
import { reqApi} from './Import';
// import Input from './component';


function Index(this: any) {
 
  const [ability,setAbility] = useState("");
  const [name,setName] = useState("");
  const [image,setImage] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  
  const waitPlease = async (input_pokemon:string) =>{
  const pokemon:string = input_pokemon //se consigue el texto del input
  const pokemon_lowercase:string = pokemon.toLowerCase().trim() //se normaliza el texto para que no cause errores(minusculas)

    
    try{
      if(pokemon_lowercase == ""){
        setName("No puede dejar el campo vacio") 
        setImage("");
        setDescription("")
        setType("");
        setAbility(""); 
      }else{
        const {data}:any = await reqApi.get("pokemon/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {data:data2}:any  = await reqApi.get("pokemon-species/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {flavor_text_entries}:any  = data2
        
        const get_descripcion = flavor_text_entries.find((element: { language: { name: string; }; }) => element.language.name == "es")


        // flavor_text_entries.forEach(element => {
        //   if(element.language.name == 'es'){
        //     descripcion = element.language.name;
        //   }
        //   break;
        // })
        
        const {abilities} = data; //se agarra la propiedad abilities del objeto data
        const {name} = data; //se agarra la propiedad name del objeto data
        const {sprites:{front_default:imagen}} = data; //se agarra la sprites y de ahi la imagen abilities del objeto data
        const {types} = data;

        var habilidades:string = "";
        var tipo:string = "";
        var url:string = "";

        types.forEach(async(element: { type: { url: string; }; }) =>{
            url = element.type.url;
            var newurl:any = url.split('v2/').pop()
            const {data:data3} = await reqApi.get(newurl);
            const {names} = data3
            var get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
            tipo += get_type.name +","
            setType("Tipo: "+tipo.slice(0,-1));//se le asigna el string de tipo a la variable tipo 
        })
        

        abilities.forEach( async(element: { ability: { url: string; }; }) => {
            url = element.ability.url;
            var newurl:any = url.split('v2/').pop()
            const {data:data3} = await reqApi.get(newurl);
            const {names} = data3
            var get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
            habilidades += get_type.name+",";
            setAbility("Habilidades: "+habilidades.slice(0,-1)); //se le asigna el string de habilidades a la variable abilty 

        });//se recorre el arreglo de abilites para anexarlas en un string

        setImage(imagen); //se le asigna la imagen a la variable image
        setDescription("Descripcion: "+get_descripcion.flavor_text)
        setName("Nombre del Pokemon: "+name.charAt(0).toUpperCase() + name.slice(1)); //se le asigna el nombre a la variable name
      }
    }catch(message:any){
      setName(message);
      setAbility(message);
    }  
    
  }
  
return (
  
    <View>
       
        <TextInput style={styles.input}
          placeholder='Escribe el id o nombre del pokemon'
          onSubmitEditing={(event) => waitPlease(event.nativeEvent.text)}
          onChangeText={value=> setValue(value)}
          value={value}

        />

        <Image style={styles.image} source={{uri: image ? image :  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png"}}></Image>
        <Text style={styles.text}>{name ? name : "Bienvenido a la aplicación"}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{type}</Text>
        <Text style={styles.text}>{ability}</Text>  
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width:250,
    height:250,
    alignSelf:'center'
  },
  text:{
    color:'black',
    fontSize:20,
    marginTop:15,
    textAlign:'center'
  },
  input:{
    fontSize:25,
    textAlign:'center'

  }
});
export default Index