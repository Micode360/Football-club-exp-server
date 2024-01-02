

export type userProperties = {
    id: String;
    firstName: String;
    lastName: String;
    email: String;
    country?: {
      imgPath: String;
      value: String;
    }
    state?: String;
    city?: String;
    zipCode?: String;
    profilePic?: {
      publicId: String;
      imgUrl: String;
    }
    password?: String;
  }

  export type loginProperties = {
    email: String;
    password: String;
  }

  export type forgetPasswordProps = {
    email: String;
  }

  export type changePasswordProps = {
    id: String;
    password: String;
  }

  export type mailOptionsProps = {
    from: {
      name: string;
      address: string;
    },
    to: string;
    subject: string;
    html: any;
  };

  export type deleteProps = {
    thisId: string
    imgId: string
  }