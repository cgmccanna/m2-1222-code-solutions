select "c"."firstName",
       "c"."lastName",
       sum("p"."amount") as "totalPayments"
  from "customers" as "c"
  join "payments" as "p" using ("customerId")
  group by "c"."customerId"
  order by "totalPayments" desc;
