import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default class extends Component {
  render() {
    return (
      <div>
        <div classname="home_picture">
          <img />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {testimonials.map((testimony, index) => (
              <Grid item xs={3}>
                <Item>
                  <TestimonialCard testimonial={testimony} unique={index} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }
}

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
