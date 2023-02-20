import React from 'react'
import { View, Text, StyleSheet,TextInput,Image,Alert, ScrollView, Button, Pressable} from 'react-native'
import { useEffect, useState} from 'react';
import { reqApi} from './Import';
// import Input from './component';
import Modal from "react-native-modal";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Index(this: any) {
 
  const [ability,setAbility] = useState("");
  const [name,setName] = useState("");
  const [image,setImage] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [move, setMoves] = useState("");
  const [description, setDescription] = useState("");
  const [homeScreen, setHome] = useState(true);
  const [loading, setLoading] = useState(false);
 
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
        setMoves("");
        setAbility("");
        setHome(true)
      }else{
        setLoading(true)
        setHome(true)
        const {data}:any = await reqApi.get("pokemon/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {data:data2}:any  = await reqApi.get("pokemon-species/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {flavor_text_entries}  = data2
        const get_descripcion = flavor_text_entries.find((element: { language: { name: string; }; }) => element.language.name == "es")
        await sleep(1000);
        setLoading(false);
        setHome(false)

        const {flavor_text:descripcion} = get_descripcion;
        const {name,abilities,moves,sprites:{front_default:imagen},types} = data; //se agarra la propiedades del objeto data

        var habilidades:string = "";
        var tipo:string = "";
        var movimientos:string = "";

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

        moves.forEach( async(element: { move: { url: string; }; }) => {
          const {move:{url}} = element;
     
          const newurl:any = url.split('v2/').pop()
          const {data:data3} = await reqApi.get(newurl);
          const {names} = data3
          const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
         
          const {name} = get_type
          movimientos += `${name}, `;
          const len_moves = movimientos.split(',')

          // setMoves("Moves:" + movimientos);
          if(len_moves.length-1 == abilities.length){
            setMoves(movimientos.slice(0,-2)); //se le asigna el string de movimientos a la variable abilty
          }

      });//se recorre el arreglo de abilites para anexarlas en un string

        setImage(imagen); //se le asigna la imagen a la variable image
        setDescription("Descripcion: "+descripcion)
        setName("Nombre del Pokemon: "+name.charAt(0).toUpperCase() + name.slice(1)); //se le asigna el nombre a la variable name
      }
    }catch(message:any){
      setName(message);
      setAbility(message);
      setMoves(message);
      setLoading(false);
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
        <Image style={loading ? styles.image_load : styles.none} source={{uri: loading ?  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs" :"placeholder.placeholder" }}></Image>
        <Image style={loading ? styles.none : styles.image} source={{uri: image ? image :  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png"}}></Image>
        <Text style={loading ? styles.none : styles.text}>{name ? name : "Bienvenido a la aplicación"}</Text>
        <Text style={loading ? styles.none : styles.text}>{description}</Text>
        <Text style={loading ? styles.none : styles.text}>{type}</Text>
        <Text style={loading ? styles.none : styles.text}>{ability}</Text>

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
         

        <Modal style={styles.modal} isVisible={isModalVisible}>
          <View style={styles.modal_view}>
            <Text style={{marginBottom:80}}>Inserte cadena de evolucion</Text>
            <Pressable style= {styles.button} onPress={handleModal}>
              <Text style={styles.text_button}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>


        <Modal style={styles.modal} isVisible={isModalVisible2}>
          <View style={styles.modal_view}>
          <ScrollView>
            <Text style={{marginBottom:80}}>{move}</Text>
            </ScrollView>
            <Pressable style= {styles.button} onPress={handleModal2}>
              <Text style={styles.text_button}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>
        
        <Modal style={styles.modal} isVisible={isModalVisible3}>
          <View style={styles.modal_view}>
            <Text style={{marginBottom:80}}>Inserte Tipos de ataque</Text>
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
  modal:{
    marginTop:300,
    alignContent:'center',
    maxHeight:200,
    justifyContent: 'center',
    alignItems: 'center',
 

  },
  modal_view:{
    flex: 2, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor:'white',
    alignSelf:'center',
    borderRadius: 6,
    height:200,
    width:200,

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
    alignItems: 'center',
    textAlign:'center',
    justifyContent: 'center',
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
