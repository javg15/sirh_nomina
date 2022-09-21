// Automatically generated. Don't change this file manually.

import Archivos, { ArchivosInitializer, } from './archivos';
import Catplanteles, { CatplantelesInitializer } from './catplanteles';
import Catpercepciones, {  } from './catpercepciones';
import Catdeducciones, {  } from './catdeducciones';
import Catquincena, {  } from './catquincena';
import Catzonaeconomica, {  } from './catzonaeconomica';
import Percepcionescaptura, {  } from './percepcionescaptura';
import Deduccionescaptura, {  } from './deduccionescaptura';
import Percepcionesadeudos, {  } from './percepcionesadeudos';
import Reducciones, {  } from './reducciones';
import Deduccionesdevoluciones, {  } from './deduccionesdevoluciones';
import Categorias, {  } from './categorias';
import Categoriasasignacion, {  } from './categoriasasignacion';
import Cattiposadeudos, {  } from './cattiposadeudos';
import Cattiposdevoluciones, {  } from './cattiposdevoluciones';
import Log, { LogInitializer, LogId } from './log';
import Modulos, { ModulosInitializer, ModulosId } from './modulos';
import Personal, { PersonalInitializer, } from './personal';
import Searchcampos, { SearchcamposInitializer, SearchcamposId } from './searchcampos';
import Searchoperador, { SearchoperadorInitializer, SearchoperadorId } from './searchoperador';
import Usuarios, { UsuariosInitializer, UsuariosId } from './usuarios';

type Model =
  | Archivos
  | Catplanteles
  | Catpercepciones
  | Catdeducciones
  | Categoriasasignacion
  | Cattiposadeudos
  | Cattiposdevoluciones
  | Catquincena
  | Catzonaeconomica
  | Percepcionescaptura
  | Deduccionescaptura
  | Reducciones
  | Percepcionesadeudos
  | Deduccionesdevoluciones
  | Categorias
  | Log
  | Modulos
  | Personal
  | Searchcampos
  | Searchoperador
  | Usuarios

interface ModelTypeMap {
  'archivos': Archivos;
  'catzonaeconomica':Catzonaeconomica;
  'catquincena':Catquincena;
  'catplanteles':Catplanteles;
  'catpercepciones':Catpercepciones;
  'catdeducciones':Catdeducciones;
  'categoriasasignacion':Categoriasasignacion;
  'cattiposadeudos':Cattiposadeudos;
  'cattiposdevoluciones':Cattiposdevoluciones;
  'categorias':Categorias;
  'percepcionescaptura':Percepcionescaptura;
  'deduccionescaptura':Deduccionescaptura;
  'percepcionesadeudos':Percepcionesadeudos;
  'deduccionesdevoluciones':Deduccionesdevoluciones;
  'reducciones':Reducciones;
  'log': Log;
  'modulos': Modulos;
  'personal': Personal;
  'searchcampos': Searchcampos;
  'searchoperador': Searchoperador;
  'usuarios': Usuarios;
}

type ModelId =
  | LogId
  | ModulosId
  | SearchcamposId
  | SearchoperadorId
  | UsuariosId

interface ModelIdTypeMap {
  'log': LogId;
  'modulos': ModulosId;
  'searchcampos': SearchcamposId;
  'searchoperador': SearchoperadorId;
  'usuarios': UsuariosId;
}

type Initializer =
  | ArchivosInitializer
  | CatplantelesInitializer
  | LogInitializer
  | ModulosInitializer
  | PersonalInitializer
  | SearchcamposInitializer
  | SearchoperadorInitializer
  | UsuariosInitializer

interface InitializerTypeMap {
  'archivos': ArchivosInitializer;
  'catplanteles':CatplantelesInitializer;
  'log': LogInitializer;
  'modulos': ModulosInitializer;
  'personal': PersonalInitializer;
  'searchcampos': SearchcamposInitializer;
  'searchoperador': SearchoperadorInitializer;
  'usuarios': UsuariosInitializer;
}

export {
  Archivos, ArchivosInitializer,
  Catquincena,
  Catzonaeconomica,
  Catpercepciones,
  Catdeducciones,
  Categoriasasignacion,
  Cattiposadeudos,
  Cattiposdevoluciones,
  Categorias,
  Percepcionescaptura,
  Deduccionescaptura,
  Percepcionesadeudos,
  Reducciones,
  Deduccionesdevoluciones,
  Log, LogInitializer, LogId,
  Modulos, ModulosInitializer, ModulosId,
  Personal, PersonalInitializer,
  Searchcampos, SearchcamposInitializer, SearchcamposId,
  Searchoperador, SearchoperadorInitializer, SearchoperadorId,
  Usuarios, UsuariosInitializer, UsuariosId,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
