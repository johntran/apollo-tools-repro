/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HeroQuery
// ====================================================

export interface HeroQuery_hero {
  __typename: "Human" | "Droid";
  name: string;
}

export interface HeroQuery {
  hero: HeroQuery_hero | null;
}
