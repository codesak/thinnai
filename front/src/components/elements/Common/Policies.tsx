import Box from "@mui/material/Box";
import DetailsSectionDivider from "./DetailsSectionDivider";

const Policies = () => {
  const cancellationPolicy =
    "Thinnai weekend and weekday cancellations have varying charges based on different timeframes. Click know more to see the full policy.";
  //'Lorem ipsum dolor sit amet, conseibendum lorem. Morbi convallis convallis diam sit ametlacinia. Aliquam in elementum tellus."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore e t dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,';

  const reschedulePolicy =
    "Free rescheduling can be done until 30 minutes prior to checkin. A booking once rescheduled cannot be cancelled or rescheduled any further.";

  return (
    <Box>
      <Box paddingRight={{ md: "5rem", sm: "0rem" }}>
        <h2 className="aboutPlace__header">Cancellations Made Easy</h2>
        <Box height={20} />
        <Box
          className="aboutPlace__p"
          display={{
            xs: "none",
            md: "block",
          }}
        >
          {cancellationPolicy}
        </Box>
        <Box
          className="aboutPlace__p"
          display={{
            xs: "block",
            md: "none",
          }}
        >
          {cancellationPolicy}
        </Box>
        <Box marginTop="0.5rem">
          <a
            style={{
              color: "#000000",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
            href="https://bookmythinnai.com/policy/updation-cancellation-and-reschedule"
          >
            Know More
          </a>
        </Box>
      </Box>
      {/* <Box
        paddingRight={{ md: "5rem", sm: "0rem" }}
        sx={{ marginBottom: { xs: "4rem", sm: "0", md: "0" } }}
      >
        <Box className="detail__header">Reschedule Policy</Box>
        <Box height={30} />
        <Box
          className="aboutPlace__p"
          display={{
            xs: "none",
            md: "block",
          }}
        >
          {reschedulePolicy}
        </Box>
        <Box
          className="aboutPlace__p"
          display={{
            xs: "block",
            md: "none",
          }}
        >
          {reschedulePolicy}
        </Box>
        <Box marginTop="0.5rem">
          <a
            style={{
              color: "#000000",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
            href="https://bookmythinnai.com/policy/updation-cancellation-and-reschedule"
          >
            Read More
          </a>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Policies;
