

export type userProperties = {
    id: String;
    userId?:string;
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


  export type leagueProps =  {
    id?: string
    userId?:string
    name: string
    logo?: {
      publicId: string;
      imgUrl: string;
    }
    country?: {
      imgPath: string;
      value: string;
    },
    description?: string
    website?: string
    socials?: {
      facebook?:string
      xlink?: string
      youtube?: string
      instagram?: string
    },
    backgroundGradient?: {
      fromColor?: string
      toColor?: string
    }
  }