import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDirectBooking, setGroupType } from "../../../actions/search";
import { RootState } from "../../../store";
import Counter from "./Counter";
import DatesCarousel from "./DatesCarousel";
import "../../styles/search.scss"

interface searchProp {
  responsiveConditionalData?: boolean;
  onClick?: () => void;
  setSearchState?: any;
}

const Search = ({
  responsiveConditionalData = false,
  setSearchState,
  onClick,
}: searchProp) => {
  const dispatch: Dispatch<any> = useDispatch();

  const groupType = useSelector<RootState, string>(
    (state) => state.search.groupType
  );
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGroupType({ groupType: event.target.value as string }));
  };

  const directBooking = useSelector<RootState, boolean>(
    (state) => state.search.directBooking
  );
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDirectBooking({ directBooking: event.target.checked }));
  }; 

  return (
    <Box
      className="search"
      width={{ md: "100%", xs: "auto" }}
      borderRadius={{ md: "0px 0px 10px 10px", xs: "0px" }}
      sx={{
        background: "white",
        fontFamily: "Open Sans",
        fontStyle: "normal",
      }}
      boxShadow={
        !responsiveConditionalData ? "0px 2px 2px rgba(0, 0, 0, 0.1)" : ""
      }
      padding={
        !responsiveConditionalData
          ? {
              md: "1.25rem 3.125rem 3.125rem 3.125rem",
              xs: "1.25rem 1.875rem 3.125rem 1.875rem",
              sm: "1.25rem 6.25rem 3.125rem 6.25rem",
            }
          : { xs: "1.25rem 0px 0px 0px" }
      }
      marginTop={
        !responsiveConditionalData
          ? {
              md: "2.8rem",
              sm: "2.7rem",
            }
          : { xs: "2.7rem" }
      }
    >
      <Box position="relative">
        <Box
          display={!responsiveConditionalData ? "flex" : "none"}
          alignItems="center"
          fontFamily="Open Sans"
          justifyContent='space-between'
          color="#454444"
          fontWeight={400}
          marginBottom='0.5rem'
        >
          <Box display='flex' alignItems='center'>
            <CalendarMonthIcon
            sx={{
              fontSize: "1.125rem",
            }}
          />{" "}
          Date</Box>
          <Button
          onClick={() => setSearchState(false)}
          sx={{
            display: { xs: "block", md: "none" },
            textTransform: "none",
            color: "#000000",
            background: "rgb(0, 0, 0, 0.03) !important",
          }}
        >
          X
        </Button>
        </Box>

        <Box
          display='flex'
          justifyContent='center'
          textAlign="center"
          height={120}
          width="100%"
          sx={{
            background: responsiveConditionalData ? "#F3F1FF" : "",
            paddingTop: responsiveConditionalData ? "1.25rem" : "0px",
          }}
        >
          <Box width='85%'><DatesCarousel bg="#fff" /></Box>
        </Box>
      </Box>
      <Box height={10} />
      <Box display="flex" width="100%" justifyContent="space-around" mt="12px">
        <Box
          display="flex"
          width="50%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems='center'
            //  justifyContent='center'
            sx={{
              fontWeight: "400",
              fontSize: "0.875rem",
              lineHeight: "27px",
            }}
          >
            <GroupsIcon sx={{ fontSize: "1.25rem", textAlign: "center" }} />
            &nbsp; No. of Guests
          </Box>
          <Box height={6} />
          <Box display="flex">
            <Box width={{xs:'fit-content',sm:'70%'}}>
              <Counter maxValue={12} />
            </Box>
          </Box>
        </Box>
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              fontWeight: "400",
              fontSize: "0.875rem",
              lineHeight: "27px",
            }}
          >
            <GroupsIcon sx={{ fontSize: "1.25rem", textAlign: "center" }} />
            &nbsp; Group Type
          </Box>
          <Box height={6} />
          <Box  display="flex" justifyContent="center">
            <FormControl
              size="small"
              sx={{ m: 0, height: "33px", width: "70%" }}
            >
              {/* <InputLabel
                id="select-search"
                sx={{
                  fontSize: "13px",
                  padding: "0",
                  margin: "0",
                  lineHeight: "1em",
                  '&.Mui-focused':{display:'none'},
                }}
              >
                Select
              </InputLabel> */}
              {/* <Select
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                style={{
                  display: "flex",
                  //flexDirection: "column",
                  textAlign: "center",
                  justifyContent: "center",
                  height: "100%",
                  border: "1px solid #868686",
                  textOverflow: 'ellipsis'
                }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={groupType}
                onChange={handleChange}
              >
                <MenuItem value="Married Couple" style={{ width: "100%" }}>
                  Married Couple
                </MenuItem>
                <MenuItem value="Unmarried Couple" style={{ width: "100%" }}>
                  Unmarried Couple
                </MenuItem>
                <MenuItem value="Men Only" style={{ width: "100%" }}>
                  Men Only
                </MenuItem>
                <MenuItem value="Women Only" style={{ width: "100%" }}>
                  Women Only
                </MenuItem>
                <MenuItem value="Men and Women" style={{ width: "100%" }}>
                  Men and Women
                </MenuItem>
              </Select> */}
              <select  
					              className="groupTypeSelect"
                        name="groupType"
                        id="groupType"
                        value={groupType}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleChange(e)
                        }
                      >
                        <option value="" selected disabled hidden>Choose here</option>
                        {/* <option value="allow_all">
                          Allow All
                        </option> */}
                        <option value="couple">
                          Couples
                        </option>
                        <option value="men_and_women">
                          Men and Women
                        </option>
                        <option value="family_with_kids">
                          Family with Kid(s)
                        </option>
                        <option value="family_without_kids" >
                          Family without Kid(s)
                        </option>
                        <option value="women_only">
							            Women only
                        </option>
                        <option value="men_only">
                          Men Only
                        </option>
                      </select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        height={!responsiveConditionalData ? { sm: 15, xs: 20 } : { xs: 0 }}
      />
      <Box
        display={!responsiveConditionalData ? "flex" : "none"}
        flexDirection="column"
      >
        <FormControlLabel
          sx={{ margin: "0 0 0 -12px" }}
          control={<Checkbox checked={directBooking} onChange={handleCheck} style={{color:'#8f7ef3'}}/>}
          label={
            <Typography
              sx={{
               // paddingLeft: "0.625rem",
                fontSize: ".875rem",
                color: "#404040",
                fontFamily: "Open Sans",
              }}
            >
              Show only ‘Instant Booking’ Options (N wait time)
            </Typography>
          }
        />
        <Box height={20} />
        <Button
          variant="contained"
          className="button"
          onClick={onClick}
          sx={{
            background: "black",
            color: "white",
            textTransform: "capitalize !important",
            fontFamily: "Inter",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
