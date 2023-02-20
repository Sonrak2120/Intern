import React from "react";
import SelectBox from "devextreme-react/select-box";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
  Label,
  ValueAxis,
  Point,
  Size,
} from "devextreme-react/chart";
// import service from "../data2";
import service from "../views/page/data";
import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const countriesInfo = service.getCountriesInfo();
const energySources = service.getEnergySources();
const types = ["line", "stackedline", "fullstackedline"];

// console.log("dataSource", dataSource);

function Test3() {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <Stack>
          <Stack>
            <div>
              <Chart palette="Violet" dataSource={countriesInfo}>
                <CommonSeriesSettings argumentField="country" type="line" />
                {energySources.map((item) => (
                  <Series
                    key={item.value}
                    valueField={item.value}
                    name={item.name}
                  >
                    {" "}
                    <Point symbol="circle" size={6} />
                  </Series>
                ))}
                <ValueAxis
                  title="SSE"
                  //   linearThreshold={-3}
                  // type="logarithmic"
                  pane="top"
                />

                <Margin bottom={20} />
                <ArgumentAxis
                  title="Degree"
                  valueMarginsEnabled={false}
                  discreteAxisDivisionMode="crossLabels"
                  // inverted={true}
                  tickInterval={2}
                >
                  <Grid visible={true}></Grid>
                </ArgumentAxis>
                <Legend
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                  itemTextPosition="bottom"
                />
                <Export enabled={true} />
                <Legend visible={false} />
                <Title text="Spectral Efficiency">
                  {/* <Subtitle text="(Millions of Tons, Oil Equivalent)" /> */}
                </Title>
                <Tooltip enabled={true} />
              </Chart>
            </div>
          </Stack>
          <Stack>
            <div>
              <Chart palette="Violet" dataSource={countriesInfo}>
                <CommonSeriesSettings argumentField="country" type="line" />
                {energySources.map((item) => (
                  <Series
                    key={item.value}
                    valueField={item.value}
                    name={item.name}
                  >
                    {" "}
                    <Point symbol="circle" size={6} />
                  </Series>
                ))}
                <ValueAxis
                  title="SSE"
                  //   linearThreshold={-3}
                  // type="logarithmic"
                  pane="top"
                />

                <Margin bottom={20} />
                <ArgumentAxis
                  title="Degree"
                  valueMarginsEnabled={false}
                  discreteAxisDivisionMode="crossLabels"
                  // inverted={true}
                  tickInterval={2}
                >
                  <Grid visible={true}></Grid>
                </ArgumentAxis>
                <Legend
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                  itemTextPosition="bottom"
                />
                <Export enabled={true} />
                <Legend visible={false} />
                <Title text="Spectral Efficiency">
                  {/* <Subtitle text="(Millions of Tons, Oil Equivalent)" /> */}
                </Title>
                <Tooltip enabled={true} />
              </Chart>
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default Test3;
