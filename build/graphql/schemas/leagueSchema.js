"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueDefs = void 0;
const apollo_server_micro_1 = require("apollo-server-micro");
exports.leagueDefs = (0, apollo_server_micro_1.gql) `
type Socials {
  facebook: String
  instagram: String
  xlink: String
  youtube: String
}

input BackgroundGradientInput {
  fromColor: String
  toColor: String
}

input SocialsInput {
  facebook: String
  instagram: String
  xlink: String
  youtube: String
}

type BackgroundGradient {
  fromColor: String
  toColor: String
}

type Leagues {
  id: String
  name: String
  logo: ImageQuery
  country: CountryQuery
  description: String
  website: String
  socials: Socials
  backgroundGradient: BackgroundGradient
}

  input LeagueInput {
    id: String
    userId: String
    name: String
    logo: ProfilePic
    country: CountryInput
    description: String
    website: String
    socials: SocialsInput
    backgroundGradient: BackgroundGradientInput
  }

  type Query {
    leagues: [Leagues]
  }

  type Mutation {
    AddLeague(input: LeagueInput!): Response
    EditLeague(input: LeagueInput!): Response
    DeleteLeague(input: Delete!): Response
  }

`;
