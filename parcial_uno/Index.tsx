import React from 'react'
import { View, Text, StyleSheet,TextInput,Image,Alert, ScrollView, Button, Pressable} from 'react-native'
import { useEffect, useState} from 'react';
import { reqApi} from './Import';
import Modal from "react-native-modal";
import { couldStartTrivia } from 'typescript';
import { Pokemon,Type,Ability} from './interfaces';
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Index(this: any) {
 
  const [ability,setAbility] = useState("");
  const [name,setName] = useState("");
  //const [id, setId] = useState("");
  const [image,setImage] = useState("");
  const [doubleDamageFrom, setDoubleDamageFrom] = useState("");
  const [doubleDamageTo, setDoubleDamageTo] = useState("");
  const [halfDamageFrom, setHalfDamageFrom] = useState("");
  const [halfDamageTo, setHalfDamageTo] = useState("");
  const [noDamageFrom, setNoDamageFrom] = useState("");
  const [noDamageTo, setNoDamageTo] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [move, setMoves] = useState("");
  const [evolution, setEvolutions] = useState("");
  const [description, setDescription] = useState("");
  const [homeScreen, setHome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [evolution1, setEvolution1] = useState("");
  const [evolution2, setEvolution2] = useState("");
  const [evolution3, setEvolution3] = useState("");
  const [evolution1Type, setEvolution1Type] = useState("");
  const [evolution2Type, setEvolution2Type] = useState("");
  const [evolution3Type, setEvolution3Type] = useState("");
 
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
        setDoubleDamageFrom("")
        setDoubleDamageTo("")
        setHalfDamageFrom("")
        setHalfDamageTo("")
        setNoDamageFrom("")
        setNoDamageTo("")
        setEvolution1("")
        setEvolution2("")
        setEvolution3("")
        setEvolution1Type("")
        setEvolution2Type("")
        setEvolution3Type("")
        setType("");
        setMoves("");
        setAbility("");
        setHome(true)
      }else{
        setLoading(true)
        setHome(true)
        setDoubleDamageFrom("")
        setDoubleDamageTo("")
        setHalfDamageFrom("")
        setHalfDamageTo("")
        setNoDamageFrom("")
        setNoDamageTo("")
        setEvolution1("")
        setEvolution2("")
        setEvolution3("")
        setEvolution1Type("")
        setEvolution2Type("")
        setEvolution3Type("")
        const {data}:any = await reqApi.get("pokemon/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {data:data2}:any  = await reqApi.get("pokemon-species/"+pokemon_lowercase); //se hace la llamada a la api para la info del pokemon
        const {flavor_text_entries}  = data2
        const {evolution_chain:{url}} = data2;
        const get_descripcion = flavor_text_entries.find((element: { language: { name: string; }; }) => element.language.name == "es")
        await sleep(1000);
        setLoading(false);
        setHome(false)

        const {flavor_text:descripcion} = get_descripcion;
        const {name,abilities,moves,sprites:{front_default:imagen},types} = data; //se agarra la propiedades del objeto data

        let habilidades:string = "";
        let tipo:string = "";
        let movimientos:string = "";
        let auxMov: string = "";
        let tipoFirstEvol:string = "";
        let tipoSecondEvol:string = "";
        let tipoThirdEvol:string = "";
        let firstEvol:string = "";
        let secondEvol:string = "";
        let thirdEvol:string = "";
        let doubleDamageFromString: string = "";
        let doubleDamageToString: string = "";
        let halfDamageFromString: string = "";
        let halfDamageToString: string = "";
        let noDamageFromString: string = "";
        let noDamageToString: string = "";

        types.forEach(async(element:Pokemon) =>{
            const {type:{url}} = element;

            let newurl:any = url.split('v2/').pop()
            const {data:data3}:Type = await reqApi.get(newurl);
            const {names} = data3

            const {damage_relations:{double_damage_from}} = data3
            const {damage_relations: {double_damage_to}} = data3
            const {damage_relations: {half_damage_from}} = data3
            const {damage_relations: {half_damage_to}} = data3
            const {damage_relations: {no_damage_from}} = data3
            const {damage_relations: {no_damage_to}} = data3
            

            const get_doubleDamageFromType = double_damage_from.map(({ url }) => url);
            const get_doubleDamageToType = double_damage_to.map(({ url }) => url);
            const get_halfDamageFromType = half_damage_from.map(({ url }) => url);
            const get_halfDamageToType = half_damage_to.map(({ url }) => url);
            const get_noDamageFromType = no_damage_from.map(({ url }) => url);
            const get_noDamageToType = no_damage_to.map(({ url }) => url);

            get_doubleDamageFromType.forEach(async(element) =>{
              let newurl = element.split('v2/').pop()
              const {data:data3} = await reqApi.get(newurl);
              const {names} = data3
              const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
              const {name} = get_type

              doubleDamageFromString += `${name}, `

              const len_tipo = doubleDamageFromString.split(',')
              if(len_tipo.length-1 == get_doubleDamageFromType.length){
                setDoubleDamageFrom("Tipos que le hacen 2x de da??o: "+doubleDamageFromString.slice(0,-2));//se le asigna el string de tipo a la variable tipo
              }
            })

            get_doubleDamageToType.forEach(async(element) =>{
              let newurl:any = element.split('v2/').pop()
              const {data:data3} = await reqApi.get(newurl);
              const {names} = data3
              const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
              const {name} = get_type
              doubleDamageToString += `${name}, `
              const len_tipo = doubleDamageToString.split(',')
              if(len_tipo.length-1 == get_doubleDamageToType.length){
                setDoubleDamageTo("Tipos a los que hace 2x de da??o: "+doubleDamageToString.slice(0,-2));//se le asigna el string de tipo a la variable tipo
              }
            })

            get_halfDamageFromType.forEach(async(element) =>{
              let newurl:any = element.split('v2/').pop()
              const {data:data3} = await reqApi.get(newurl);
              const {names} = data3
              const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
              const {name} = get_type
              halfDamageFromString += `${name}, `
              const len_tipo = halfDamageFromString.split(',')
              if(len_tipo.length-1 == get_halfDamageFromType.length){
                setHalfDamageFrom("Tipos que le hacen 0.5x de da??o: "+halfDamageFromString.slice(0,-2));//se le asigna el string de tipo a la variable tipo
              }
            })

            get_halfDamageToType.forEach(async(element) =>{
              let newurl:any = element.split('v2/').pop()
              const {data:data3} = await reqApi.get(newurl);
              const {names} = data3
              const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
              const {name} = get_type
              halfDamageToString += `${name}, `
              const len_tipo = halfDamageToString.split(',')
              if(len_tipo.length-1 == get_halfDamageToType.length){
                setHalfDamageTo("Tipos a los que hace 0.5x de da??o: "+halfDamageToString.slice(0,-2));//se le asigna el string de tipo a la variable tipo
              }
            })

            get_noDamageFromType.forEach(async(element) =>{
              let newurl:any = element.split('v2/').pop()
              const {data:data3} = await reqApi.get(newurl);
              const {names} = data3
              const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
              const {name} = get_type
              noDamageFromString += `${name}, `
              const len_tipo = noDamageFromString.split(',')
              if(len_tipo.length-1 == get_noDamageFromType.length){
                setNoDamageFrom("Tipos que no le hacen da??o: "+noDamageFromString.slice(0,-2));//se le asigna el string de tipo a la variable tipo
              }
            })

            get_noDamageToType.forEach(async(element) =>{
              let newurl:any = element.split('v2/').pop()
              const {data:data3} = await reqApi.get(newurl);
              const {names} = data3
              const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
              const {name} = get_type
              noDamageToString += `${name}, `
              const len_tipo = noDamageToString.split(',')
              if(len_tipo.length-1 == get_noDamageToType.length){
                setNoDamageTo("Tipos a los que no le hace da??o: "+noDamageToString.slice(0,-2));//se le asigna el string de tipo a la variable tipo
              }
            })

            const get_type = names.find((element) => element.language.name == "es")
            
            const {name} = get_type
            tipo += `${name}, `
            const len_tipo = tipo.split(',')

            if(len_tipo.length-1 == types.length){
              setType("Tipo: "+tipo.slice(0,-2));//se le asigna el string de tipo a la variable tipo
            }
        })
        
        let newurl:any = url.split('v2/').pop()
        const {data: data4} = await reqApi.get(newurl);
        const {chain: {species: {name: firstEvolution}}} = data4
        const {chain: {evolves_to: arrayEvolution}} = data4
        const {chain: {species: {url: firstEvolutionUrl}}} = data4
        let newurl_firstEvol:any = firstEvolutionUrl.split('v2/pokemon-species/').pop()
        const {data: data5} = await reqApi.get("pokemon/"+newurl_firstEvol)
        const {types: typeFirstEvolution} = data5
        firstEvol = firstEvolution
        setEvolution1(firstEvol);

        typeFirstEvolution.forEach(async(element: { type: { url: string; }; }) =>{
            const {type:{url}} = element;

            let newurl:any = url.split('v2/').pop()
            const {data:data3} = await reqApi.get(newurl);
            const {names} = data3

            const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
            const {name} = get_type
            tipoFirstEvol += `${name},` 
            const len_tipo = tipoFirstEvol.split(',')

            if(len_tipo.length-1 == typeFirstEvolution.length){
              setEvolution1Type(tipoFirstEvol.slice(0,-1));//se le asigna el string de tipo a la variable tipo
            }

        })

        if (arrayEvolution.length != 0){
          let string_eevee =""

          for (var i = 0; i < arrayEvolution.length; i++){
              const secondevourl = arrayEvolution[i].species.url;
              let newurl:any = secondevourl.split('v2/pokemon-species/').pop()
              const {data: data5} = await reqApi.get("pokemon/"+newurl)
              const {types: secondEvolution} = data5
              secondEvol += `${arrayEvolution[i].species.name}  `

              secondEvolution.forEach(async(element: { type: { url: string; }; }) =>{
                const {type:{url}} = element;
                let newurl:any = url.split('v2/').pop()
                const {data:data3} = await reqApi.get(newurl);
                const {names} = data3

                const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")

                const {name} = get_type
                tipoSecondEvol += `${name},`
                if(arrayEvolution.length > 1){
                  string_eevee += `${arrayEvolution[i-1].species.name} (${name}) `
                  setEvolution2(string_eevee)
                }else{
                  setEvolution2(secondEvol.slice(0,-1))
                  setEvolution2Type(tipoSecondEvol.slice(0,-1));//se le asigna el string de tipo a la variable tipo
                }
                

            })

              for (var index = 0; index < arrayEvolution[0].evolves_to.length; index++) {
                const thirdevourl = arrayEvolution[index].evolves_to[index].species.url;
                let newurl:any = thirdevourl.split('v2/pokemon-species/').pop()
                const {data: data6} = await reqApi.get("pokemon/"+newurl)
                const {types: thirdEvolution} = data6

                thirdEvol += `${arrayEvolution[index].evolves_to[index].species.name} ` 

                setEvolution3(thirdEvol.slice(0,-1));//se le asigna el string de tipo a la variable tipo
                thirdEvolution.forEach(async(element: { type: { url: string; }; }) =>{
                  const {type:{url}} = element;
                  let newurl:any = url.split('v2/').pop()
                  const {data:data3} = await reqApi.get(newurl);
                  const {names} = data3
      
                  const get_type = names.find((element: { language: { name: string; }; }) => element.language.name == "es")
      
                  const {name} = get_type
                  tipoThirdEvol += `${name},` 
      
                  setEvolution3Type(tipoThirdEvol.slice(0,-1));//se le asigna el string de tipo a la variable tipo
      
              })
              }
            }
        }
          
        abilities.forEach( async(element: Ability) => {
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
          const {data:data4} = await reqApi.get(newurl);
          const {names} = data4

          let get_mov = names.find((element) =>{ return element.language.name === "es"})
          if (get_mov !== undefined) {
            const {name} = get_mov
            auxMov += `${name}, `;
            let len_moves = auxMov.split(',');
            len_moves.sort();
            len_moves[0] = len_moves[len_moves.length -1];
            len_moves.pop();
            if(len_moves.length == moves.length){
              movimientos += `${len_moves}`
              setMoves(movimientos); //se le asigna el string de movimientos a la variable abilty
            }
          }else{
            get_mov = ""
            let len_moves = auxMov.split(',');
            len_moves.sort();
            len_moves[0] = len_moves[len_moves.length -1];
            len_moves.pop();
             if(len_moves.length == moves.length){
              movimientos += `${len_moves}`;
              setMoves(movimientos); //se le asigna el string de movimientos a la variable abilty
            }
          }
      });

        setImage(imagen); //se le asigna la imagen a la variable image
        setDescription("Descripcion: "+descripcion)
        setName("Nombre del Pokemon: "+name.charAt(0).toUpperCase() + name.slice(1)); //se le asigna el nombre a la variable name
      }
    }catch(message:any){
      setName(message);
      setAbility(message);
      setMoves(message);
      setEvolutions(message);
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
        <Text style={loading ? styles.none : styles.text}>{name ? name : "Bienvenido a la aplicaci??n"}</Text>
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
            <ScrollView>
              <Text style={{marginBottom:1}}>{`${evolution1} (${evolution1Type})`}</Text>
              <Text style={{marginBottom:1}}>{evolution2 ? `->${evolution2}`:"No tiene segunda evolucion"}{evolution2Type ? `(${evolution2Type})` : " "}</Text>
              <Text style={{marginBottom:1}}>{evolution3 ? `->${evolution3} (${evolution3Type})`: "No tiene tercera evolucion" }</Text>
            </ScrollView>
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
          <ScrollView>

            <Text style={doubleDamageFrom ? {marginBottom:1}:{marginBottom:1,display:'none'}}>{doubleDamageFrom}</Text>
            <Text style={doubleDamageTo ? {marginBottom:1}:{marginBottom:1,display:'none'}}>{doubleDamageTo}</Text>
            <Text style={halfDamageFrom ? {marginBottom:1}:{marginBottom:1,display:'none'}}>{halfDamageFrom}</Text>
            <Text style={halfDamageTo ? {marginBottom:1}:{marginBottom:1,display:'none'}}>{halfDamageTo}</Text>
            <Text style={noDamageFrom ? {marginBottom:1}:{marginBottom:1,display:'none'}}>{noDamageFrom}</Text>
            <Text style={noDamageTo ? {marginBottom:1}:{marginBottom:1,display:'none'}}>{noDamageTo}</Text>
            
          </ScrollView>
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
    padding:10, 
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
    marginBottom:10,
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

