"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    const { id, psWord } = await UserStorage.getUserInfo(client.id);

    if (id) {
      if (id === client.id && psWord === client.psWord) {
        return { success: true };
      } else {
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      }
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." };
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      const errMsg = { success: false, msg: err };
      return errMsg;
    }
  }
}

module.exports = User;
