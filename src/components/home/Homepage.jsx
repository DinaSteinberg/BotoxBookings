import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const Homepage = () => {
  return (
    <>
      <div>
        <div className="home_picture">
          <h1 style={{ textAlign: "center", color: "blue" }}>
            Welcome to Botox Bookings, where all your wrinkles fade away!
          </h1>
          <img
            alt="home_pic"
            style={{ margin: "50px" }}
            width="70%"
            src="https://www.advancedrejuvenationcenters.com/wp-content/uploads/2019/11/botox_cosmetic_advanced_rejuvenation_centers.jpg"
          />
        </div>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          alignItems="center-horizontal"
        >
          <Grid container spacing={2}>
            {testimonials.map((testimony, index) => (
              <Grid
                item
                xs={3}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TestimonialCard testimonial={testimony} unique={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

const TestimonialCard = (props) => {
  return (
    <div className="home_testimonials" key={props.unique}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.testimonial.text}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {props.testimonial.author}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const testimonials = [
  {
    text: "The doctor is beyond amazing! I did botox on my crows feet and everyone told me I looked 20 years younger! Would very very highly reccomend!",
    author: "Reva Schonowitz",
  },
  {
    text: "Great doctor. Very friedly and accomodating I never felt so good about how I look",
    author: "Anonymous",
  },
  {
    text: "Would ttly reccomend. Dr. T is the best person evr and she did SUCH a good job! Ppl run to her this second! Literally changed my life.",
    author: "Flatbush diva",
  },
  {
    text: "The doctor is beyond amazing! I did botox on my crows feet and everyone told me I looked 20 years younger! Would very very highly reccomend!",
    author: "Reva Schonowitz",
  },
  {
    text: "Great doctor. Very friedly and accomodating I never felt so good about how I look",
    author: "Anonymous",
  },
  {
    text: "Would ttly reccomend. Dr. T is the best person evr and she did SUCH a good job! Ppl run to her this second! Literally changed my life.",
    author: "Flatbush diva",
  },
  {
    text: "The doctor is beyond amazing! I did botox on my crows feet and everyone told me I looked 20 years younger! Would very very highly reccomend!",
    author: "Reva Schonowitz",
  },
  {
    text: "Great doctor. Very friedly and accomodating I never felt so good about how I look",
    author: "Anonymous",
  },
  {
    text: "Would ttly reccomend. Dr. T is the best person evr and she did SUCH a good job! Ppl run to her this second! Literally changed my life.",
    author: "Flatbush diva",
  },
];
