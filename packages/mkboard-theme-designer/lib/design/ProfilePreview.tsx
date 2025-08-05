import { EffortLegend, useEffort } from "@mkboard/lesson-ui";
import { Box } from "@mkboard/widget";

export function ProfilePreview() {
  const effort = useEffort();
  return (
    <Box alignItems="center" justifyContent="center">
      <div>
        <EffortLegend effort={effort} />
      </div>
    </Box>
  );
}
