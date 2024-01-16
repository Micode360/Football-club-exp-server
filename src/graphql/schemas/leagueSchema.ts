import { gql } from "apollo-server-micro";

export const leagueDefs = gql`
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
    leagueId: String
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
