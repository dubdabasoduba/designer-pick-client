/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    verificationCode: string;
    verify: boolean;
    type: string;
    forceUpdate: boolean;
    uuid: string;
    entityIconImage: string;
    person: string;
    name: string
    account_type: number;
}
