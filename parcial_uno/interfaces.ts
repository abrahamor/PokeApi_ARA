
  
export interface Pokemon {
    type:Pokemon_type
}
export interface Type{
    data:{
        damage_relations:Damage_relation
        names:[Name]
    }
}
export interface Ability {
    ability: ability,
    is_hidden?: boolean,
    slot?: number,
}
interface Name{
    language:Language,
    name:string
}
interface Pokemon_type{
    name:string,
    url:string
  }


interface Language{
    name:string,
    url:string
}

interface double_damage_from{
    name:string,
    url:string
}
interface double_damage_to{
    name:string,
    url:string
}
interface half_damage_from{
    name:string,
    url:string
}
interface half_damage_to{
    name:string,
    url:string
}
interface no_damage_from{
    name:string,
    url:string
}
interface no_damage_to{
    name:string,
    url:string
}

interface Damage_relation{
    double_damage_from:[double_damage_from],
    double_damage_to:[double_damage_to],
    half_damage_from:[half_damage_from],
    half_damage_to:[half_damage_to],
    no_damage_from:[no_damage_from],
    no_damage_to:[no_damage_to]
}

interface ability{
    name: string,
    url: string,
}
