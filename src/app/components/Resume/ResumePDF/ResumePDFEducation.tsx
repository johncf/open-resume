import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeEducation } from "lib/redux/types";

export const ResumePDFEducation = ({
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  educations: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, date, gpa, descriptions = [] }, idx) => {
          const showDescriptions = descriptions.join() !== "";
          const secondLineColor = "#666";

          return (
            <View key={idx}>
              <View style={{ ...styles.flexRowBetween }}>
                <ResumePDFText bold={true}>{degree}</ResumePDFText>
                <ResumePDFText>{date}</ResumePDFText>
              </View>
              <View style={{ ...styles.flexRowBetween, marginTop: spacing["1.2"] }}>
                <ResumePDFText color={secondLineColor}>{school}</ResumePDFText>
                {gpa && ( <ResumePDFText color={secondLineColor}>{gpa}</ResumePDFText> )}
              </View>
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
