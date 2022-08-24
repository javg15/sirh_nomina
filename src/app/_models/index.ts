// Automatically generated. Don't change this file manually.

import Archivos, { ArchivosInitializer, } from './archivos';
import Catplanteles, { CatplantelesInitializer } from './catplanteles';
import Catvariablesbase, { CatvariablesbaseInitializer } from './catvariablesbase';
import Log, { LogInitializer, LogId } from './log';
import Modulos, { ModulosInitializer, ModulosId } from './modulos';
import Personal, { PersonalInitializer, } from './personal';
import Searchcampos, { SearchcamposInitializer, SearchcamposId } from './searchcampos';
import Searchoperador, { SearchoperadorInitializer, SearchoperadorId } from './searchoperador';
import Usuarios, { UsuariosInitializer, UsuariosId } from './usuarios';

type Model =
  | Archivos
  | Catplanteles
  | Catvariablesbase
  | Log
  | Modulos
  | Personal
  | Searchcampos
  | Searchoperador
  | Usuarios

interface ModelTypeMap {
  'archivos': Archivos;
  'catplanteles':Catplanteles;
  'catvariablesbase':Catvariablesbase;
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
  | CatvariablesbaseInitializer
  | LogInitializer
  | ModulosInitializer
  | PersonalInitializer
  | SearchcamposInitializer
  | SearchoperadorInitializer
  | UsuariosInitializer

interface InitializerTypeMap {
  'archivos': ArchivosInitializer;
  'catplanteles':CatplantelesInitializer;
  'catvariablesbase':CatvariablesbaseInitializer;
  'log': LogInitializer;
  'modulos': ModulosInitializer;
  'personal': PersonalInitializer;
  'searchcampos': SearchcamposInitializer;
  'searchoperador': SearchoperadorInitializer;
  'usuarios': UsuariosInitializer;
}

export {
  Archivos, ArchivosInitializer,
  Catvariablesbase,CatvariablesbaseInitializer,
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
