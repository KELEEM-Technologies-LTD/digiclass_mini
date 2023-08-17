import { Payment } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StorageBox } from "../core/storage";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { formatCedis } from "../components/helpers";
import NavBar from "../components/navbar";
import { displayLoading, displayWarning } from "../components/alert";
import GeneralContext from "../context/gen";
import { CurrencyContext } from "../context/CurrencyContext";

const BuyNow = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<any>([]);
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");

  const { courseid, corp_id } = useParams();
  const { corpid, setCorpId } = useContext(GeneralContext);
  const { convertValue } = useContext(CurrencyContext);

  useEffect(() => {
    if (StorageBox.retrieveUserData()?.corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  const getData = async () => {
    const userdata = StorageBox.retrieveUserData();
    setEmail(userdata.email);
    setLname(userdata.last_name);
    setFname(userdata.first_name);

    try {
      const res: any = await baseService.get(
        urls.getCourses +
          `/${courseid}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );
      //   console.log(res.data.data);
      setItem(res.data.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const startPayment = async () => {
    displayLoading("Initializing.....");
    const init_data = {
      email: email,
      amount: item.price,
      courses: [courseid],
      return_url: window.location.origin + `/check/${corp_id}`,
      location_of_purchase: "private",
    };

    try {
      const userdata = StorageBox.retrieveUserData();
      const res: any = await baseService.post(
        urls.initiatePayment + `/${userdata.user_id}`,
        init_data
      );
      // console.log(res.data?.payload);
      window.location.href = res.data?.payload?.authorization_url;
    } catch (error) {
      // console.log(error);
      displayWarning("Error initializing payment, please try again later");
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-10">
        <Grid className="mb-3" container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" className="mb-4">
              Order Summary
            </Typography>
            {loading ? (
              <></>
            ) : (
              <>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1" component="h3">
                          {item.short_description}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          component="h3"
                          align="right"
                        >
                          {formatCedis(item.price, "GHS")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1" component="h3">
                          Total
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          component="h3"
                          align="right"
                        >
                          {formatCedis(item.price, "GHS")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" className="mb-4">
              Payment information
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" className="mb-4">
                  Payment Information
                </Typography>
                <Divider className="my-4" />
                <div className="my-3">
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      variant="outlined"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      variant="outlined"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider className="my-4" />
        <div className="text-end mt-5">
          <Button
            variant="contained"
            endIcon={<Payment />}
            className="ml-auto"
            disabled={loading}
            onClick={startPayment}
          >
            Complete purchase
          </Button>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
