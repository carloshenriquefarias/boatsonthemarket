import { AUTH_STORAGE } from './storageConfig';

export async function storageAuthTokenSave(token: string) { //Armazenar
  await localStorage.setItem(AUTH_STORAGE, token);
}

export async function storageAuthTokenGet() { //Pegar
  const token = await localStorage.getItem(AUTH_STORAGE);
  return token;
}

export async function storageAuthTokenRemove() { //Remover
  await localStorage.removeItem(AUTH_STORAGE);
}