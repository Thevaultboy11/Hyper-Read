import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, FormControl, Select, MenuItem } from "@material-ui/core/";
import { post_wpm } from "../../routes/analytics/post_wpm";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useStyles = makeStyles((theme: any) => ({
  quantityRoot: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
  },
}));

export default function ReadingForm({ handle_wpm, handle_chunk }: any) {
  const [wpm, set_wpm] = useState(200);
  const queryClient = useQueryClient();
  const list_wpm = Array.from({ length: 7 }, (_, i) => (i + 2) * 100);
  const classes = useStyles();
  const [wordPerFlash, setWordPerFlash] = useState(1);
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  const handleWpm = async (event: any) => {
    const new_wpm = event.target.value;
    const res = await post_wpm(new_wpm);
    if (res.status == 200) {
      queryClient.invalidateQueries([
        `analytics/personalBest/user/${userID}`,
        `analytics/graphWpm/user/${userID}`,
      ]);
    }
    handle_wpm(new_wpm);
    set_wpm(new_wpm);
  };
  return (
    <div className="rounded-full px-4 shadow-2xl">
      <FormControl>
        <Select
          defaultValue={200}
          variant="outlined"
          className={classes.quantityRoot}
          value={wpm}
          endAdornment={
            <div className="z-3 bg-white ">
              <p className=" font-bold text-primary200">WPM</p>
            </div>
          }
          onChange={handleWpm}
        >
          {list_wpm.map((i: any, idx: any) => (
            <MenuItem value={i} className="flex flex-row gap-x-4" key={idx}>
              <p className="font-semibold">{i}</p>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
