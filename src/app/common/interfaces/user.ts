import { Injectable } from '@angular/core';

export interface ILoginPayload {
    email: string;
    password: string;
  }

export interface ISignupPayload {
    email: string;
    username: string;
    password: string;
  }



export interface IStore {
  name: string;
  owner: string;
  pk: number;
}
