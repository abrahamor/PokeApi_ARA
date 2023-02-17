import React from 'react'
import { View, Text, StyleSheet,TextInput,Image,Alert, Button, Pressable} from 'react-native'
import { useEffect, useState} from 'react';
import { reqApi} from './Import';
// import Input from './component';
import Modal from "react-native-modal";






function Index(this: any) {
 
  const [ability,setAbility] = useState("");
  const [name,setName] = useState("");
  const [image,setImage] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [homeScreen, setHome] = useState(true);
 
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalVisible2, setIsModalVisible2] = React.useState(false);
  const [isModalVisible3, setIsModalVisible3] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const handleModal2 = () => setIsModalVisible2(() => !isModalVisible2);
  const handleModal3 = () => setIsModalVisible3(() => !isModalVisible3);


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
        setHome(true)
      }else{
        const {data}:any = await reqApi.get("pokemon/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {data:data2}:any  = await reqApi.get("pokemon-species/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {flavor_text_entries}  = data2
        const get_descripcion = flavor_text_entries.find((element: { language: { name: string; }; }) => element.language.name == "es")
        setHome(false)

        const {flavor_text:descripcion} = get_descripcion;
        const {name,abilities,sprites:{front_default:imagen},types} = data; //se agarra la propiedades del objeto data

        var habilidades:string = "";
        var tipo:string = "";


        types.forEach(async(element: { type: { url: string; }; }) =>{
            const {type:{url}} = element;

            var newurl:any = url.split('v2/').pop()
            const {data:data3} = await reqApi.get(newurl);
            const {names} = data3
            const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
            
            const {name} = get_type
            tipo += `${name}, `
            const len_tipo = tipo.split(',')

            if(len_tipo.length-1 == types.length){
              setType("Tipo: "+tipo.slice(0,-2));//se le asigna el string de tipo a la variable tipo
            }
        })
     
        abilities.forEach( async(element: { ability: { url: string; }; }) => {
            const {ability:{url}} = element;
       
            const newurl:any = url.split('v2/').pop()
            const {data:data3} = await reqApi.get(newurl);
            const {names} = data3
            const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
           
            const {name} = get_type
            habilidades += `${name}, `;
            const len_habilidades = habilidades.split(',')

            if(len_habilidades.length-1 == abilities.length){
              setAbility("Habilidades: "+habilidades.slice(0,-2)); //se le asigna el string de habilidades a la variable abilty
            }
        });//se recorre el arreglo de abilites para anexarlas en un string




        setImage(imagen); //se le asigna la imagen a la variable image
        setDescription("Descripcion: "+descripcion)
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

        <View style={{ flexDirection:"row",justifyContent:'space-between'}}>
          <Pressable style= {homeScreen ?  styles.none : styles.button } onPress={handleModal}>
            <Text style={{flex:2,padding:5,color:'white'}}>Evolucion</Text>
          </Pressable>
          <Pressable style= {homeScreen ?  styles.none : styles.button } onPress={handleModal2}>
            <Text style={{flex:2,padding:5,color:'white'}}>Movimientos</Text>
          </Pressable>
         
        </View> 
        <View>
        <Pressable style= {homeScreen ?  styles.none : styles.button } onPress={handleModal3}>
            <Text style={{flex:2,padding:5,color:'white'}}>Tipos de ataque</Text>
          </Pressable>
        </View>
         


        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1,backgroundColor:'white' }}>
            <Text>Inserte cadena de evolucion</Text>
            <Pressable style= {styles.button} onPress={handleModal}>
              <Text style={styles.text_button}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>

        <Modal isVisible={isModalVisible2}>
          <View style={{ flex: 1,backgroundColor:'white' }}>
            <Text>Inserte Movimientos</Text>
            <Pressable style= {styles.button} onPress={handleModal2}>
              <Text style={styles.text_button}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>
        
        <Modal isVisible={isModalVisible3}>
          <View style={{ flex: 1,backgroundColor:'white' }}>
            <Text>Inserte Tipos de ataque</Text>
            <Pressable style= {styles.button} onPress={handleModal3}>
              <Text style={styles.text_button}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>

    </View>
  )
}




const styles = StyleSheet.create({
  none:{
    display:'none'
  },
  button: {
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  text_button: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    width:75,
    letterSpacing: 0.25,
    color: 'white',
  },
  image:{
    marginTop:10,
    marginBottom:-25,
    width:250,
    height:250,
    alignSelf:'center'
  },
  image_load:{
    marginTop:20,
    width:300,
    height:100,
    alignSelf:'center',
  },
  text:{
    color:'black',
    fontSize:20,
    marginTop:15,
    textAlign:'center'
  },
  input:{
    fontSize:25,
    textAlign:'center',
  }
});
export default Index
