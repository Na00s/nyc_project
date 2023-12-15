df <- read.csv("all_data_multi.csv")


library(dplyr)

df <- subset(df, NAICS_TITLE %in% "Cross-industry")

df <- df |> dplyr::select(-c(NAICS, NAICS_TITLE, O_GROUP, TOT_EMP, EMP_PRSE, LOC_QUOTIENT,
                             PCT_TOTAL, H_MEAN, MEAN_PRSE, H_PCT10, H_PCT25, H_PCT75, H_PCT90,
                             H_MEDIAN, A_PCT10, A_PCT25, A_PCT75, A_PCT90, ANNUAL, HOURLY,
                             A_MEDIAN, OCC_CODE, OWN_CODE, AREA_TYPE, I_GROUP, AREA))

df <- subset(df, OCC_TITLE %in% c("Computer and Information Research Scientists",
                                "Data Scientists", "Software Developers",
                                "Statisticians", "All Occupations"))
df <- subset(df, AREA_TITLE %in% c("New York-Newark-Jersey City, NY-NJ-PA", "San Francisco-Oakland-Hayward, CA", "U.S."))



