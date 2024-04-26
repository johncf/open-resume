import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";
import { checkAndFixOldCustom } from "lib/redux/types";

export const ResumePDFCustom = ({
  heading,
  custom,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  custom: ResumeCustom[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  custom = checkAndFixOldCustom(custom);
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {custom.map(
        ({ title, date, descriptions }, idx) => {
          const showTitle = title !== "";

          return (
            <View key={idx}>
              {showTitle && (
                <View style={{ ...styles.flexRowBetween }}>
                  <ResumePDFText bold={true}>{title}</ResumePDFText>
                  <ResumePDFText>{date}</ResumePDFText>
                </View>
              )}
              <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                <ResumePDFBulletList
                  items={descriptions}
                  showBulletPoints={showBulletPoints}
                />
              </View>
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
