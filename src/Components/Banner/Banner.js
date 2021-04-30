import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Container, Grid } from "@material-ui/core";
import { KeyboardArrowLeftOutlined } from "@material-ui/icons";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://ispe.org/sites/default/files/styles/hero_banner_large/public/2019-03/cover1900px650_0.jpg?itok=l2ZWC_15",
  },
  {
    label: "Bird",
    imgPath:
      "https://image.freepik.com/free-vector/throat-lozenge-lemon-cough-drops-banner_33099-2184.jpg",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ78IyWR2tfy1sncJ_vxhM5_STzkiC27WDvmYFz5hPBSQ_3RFmWXMWZdvTU1p6A05tayA&usqp=CAU",
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd0Kwl5CvukTLp5hI7Vmvhti2B8hUhfYAQZg&usqp=CAU",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://sciexaminer.com/wp-content/uploads/2020/07/Healthcare_banner-1.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    position: "relative",
    top: 0,
    width: "100%",
  },
  arrowLeft: {
    position: "absolute",
    top: "50%",
  },
  arrowRight: {
    position: "absolute",
    top: "50%",
    right: 10,
  },

  img: {
    height: "auto",
    display: "block",
    width: "100%",
    overflow: "hidden",
    maxHeight: 400,
    objectFit: "contain",
  },
  stepper: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#fff",
    display: "grid",
    justifyContent: "center",
  },
}));

function Banner() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      {/* <Button
        size="small"
        className={classes.arrowLeft}
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </Button> */}
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={tutorialSteps.length}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
      />
      {/* <Button
        size="small"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
        className={classes.arrowRight}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeftOutlined />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button> */}
    </div>
  );
}

export default Banner;
