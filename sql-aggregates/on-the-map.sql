select "countries"."name",
        count("cities". *) as "citiesPerCountry"
  from "countries"
  join "cities" using ("countryId")
  group by "countries"."name";
