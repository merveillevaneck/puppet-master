import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const businesses = createTRPCRouter({
  getListOfMatches: publicProcedure
    .input(z.string().optional())
    .mutation(async ({ ctx, input }) => {
      const param = input ? `?keyword=${input}` : ''
      // simulate a slow db call
      const result = await fetch(
        `https://psiraapi.sortelearn.com/api/SecurityOfficer/GetBusinessList${param}`,
        {
          method: 'GET',
          headers: {
            'Origin': 'https://digitalservices.psira.co.za',
            'Referer': 'https://digitalservices.psira.co.za',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer undefined'
          }
        }
      )

      try {
        const data = await result.json()
        return data
      } catch (e) {
        console.log('e', e)
        return null
      }
    }),
});
