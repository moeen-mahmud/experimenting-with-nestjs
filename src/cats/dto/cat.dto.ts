export class CreateCatDTO {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export class ListAllEntities {
  limit: number;
}

export class UpdateCatDTO {
  id: number;
  name: string;
  age: number;
  breed: string;
}
