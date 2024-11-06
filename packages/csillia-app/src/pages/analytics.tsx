import Statistic from "../component/reusable/statistic";
import CurvedLineChart from "../component/reusable/CurvedLineChart";
import League from "../component/reusable/league";
import { useQuery } from "@tanstack/react-query";
import { get_graphWpm } from "../routes/analytics/get_grapWpm";
import { get_pr } from "../routes/analytics/get_pr";
import { get_visits } from "../routes/analytics/get_visits";
import { get_time } from "../routes/analytics/get_time";
import CurvedLineChartSkeleton from "../component/reusable/skeleton/CurvedLineChartSkeleton";
import LeagueSkeleton from "../component/reusable/skeleton/LeagueSkeleton";
import StatisticSkeleton from "../component/reusable/skeleton/StatisticsSkeleton";
import handle_protected_routes from "../lib/auth/handle_protected_routes";
import { useSession } from "next-auth/react";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

function Analytics() {
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  const { isLoading: loadingGraph, data: graphWpm } = useQuery({
    queryKey: [`analytics/graphWpm/user/${userID}`],
    queryFn: async () => await get_graphWpm(),
  });

  const { isLoading: loadingPR, data: pr } = useQuery({
    queryKey: [`analytics/personalBest/user/${userID}`],
    queryFn: async () => await get_pr(),
  });
  const { isLoading: loadingVisits, data: visits } = useQuery({
    queryKey: [`analytics/visits/user/${userID}`],
    queryFn: async () => await get_visits(),
  });

  const { isLoading: loadingTime, data: time } = useQuery({
    queryKey: [`analytics/timeSpent/user/${userID}`],
    queryFn: async () => await get_time(),
  });

  return (
    <>
      <div className="container mt-10">
        <div className="row">
          {loadingPR ? (
            <>
              <LeagueSkeleton />
            </>
          ) : (
            <>
              {pr.data?.PR <= 199 && pr.data?.PR >= 0 ? (
                <>
                  <League
                    style="col-12 bg-yellow-700 rounded-md"
                    league="Bronze"
                    wpm={pr.data?.PR || 0}
                    next="200"
                  />
                </>
              ) : (
                <></>
              )}
              {pr.data?.PR <= 399 && pr.data?.PR >= 200 ? (
                <>
                  <League
                    style="col-12 bg-gray-300 rounded-md"
                    league="Silver"
                    wpm={pr.data?.PR}
                    next="400"
                  />
                </>
              ) : (
                <></>
              )}
              {pr.data?.PR <= 599 && pr.data?.PR >= 400 ? (
                <>
                  <League
                    style="col-12 bg-yellow-400 rounded-md"
                    league="Gold"
                    wpm={pr.data?.PR}
                    next="600"
                  />
                </>
              ) : (
                <></>
              )}
              {pr.data?.PR <= 799 && pr.data?.PR >= 600 ? (
                <>
                  <League
                    style="col-12 bg-indigo-200 rounded-md"
                    league="Platinum"
                    wpm={pr.data?.PR}
                    next="800"
                  />
                </>
              ) : (
                <></>
              )}
              {pr.data?.PR >= 800 ? (
                <>
                  <League
                    style="col-12 bg-blue-200 rounded-md"
                    league="Diamond"
                    wpm={pr.data?.PR}
                    next="∞"
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
          {loadingVisits ? (
            <>
              <StatisticSkeleton className="col-span-12 md:col-span-4" />
            </>
          ) : (
            <>
              <Statistic
                header="Number of visits"
                value={visits.data?.total_logins || 0}
                footer="Visits"
              />
            </>
          )}
          {loadingTime ? (
            <>
              <StatisticSkeleton className="col-span-12 md:col-span-4" />
            </>
          ) : (
            <>
              <Statistic
                header="Time spent on app"
                value={time.data?.value || 0}
                footer={time.data?.type}
              />
            </>
          )}
          {loadingPR ? (
            <>
              <StatisticSkeleton className="col-span-12 md:col-span-4" />
            </>
          ) : (
            <>
              <Statistic
                header="Personal best"
                value={pr.data?.PR || 0}
                footer="WPM"
              />
            </>
          )}
          {loadingGraph ? (
            <>
              <CurvedLineChartSkeleton />
            </>
          ) : (
            <>
              <CurvedLineChart
                data={{
                  labels,
                  datasets: [
                    {
                      label: "",
                      data: graphWpm.data?.data || [1, 1, 1, 1, 1],
                      fill: false,
                      borderColor: "#4072EE",
                      tension: 0.4,
                      cubicInterpolationMode: "monotone",
                    },
                  ],
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Analytics;

export async function getServerSideProps(context: any) {
  return handle_protected_routes(context.req, context.res);
}
