import { Form, FormSection } from "components/ResumeForm/Form";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeSlice";
import type { ResumeCustom } from "lib/redux/types";
import { checkAndFixOldCustom } from "lib/redux/types";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "lib/redux/settingsSlice";

export const CustomForm = () => {
  const custom: ResumeCustom[] = checkAndFixOldCustom(useAppSelector(selectCustom));
  const dispatch = useAppDispatch();
  const showDelete = custom.length > 1;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  return (
    <Form form={form} addButtonText="Add custom item">
      {custom.map(({ title, date, descriptions }, idx) => {
        const handleCustomChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeCustom>
        ) => {
          dispatch(changeCustom({ idx, field, value } as any));
        };

        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== custom.length - 1;

        return (
          <FormSection
            key={idx}
            form="custom"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete custom item"
          >
            <Input
              label="Title"
              labelClassName="col-span-4"
              name="title"
              placeholder="Custom Title"
              value={title}
              onChange={handleCustomChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="May 2018"
              value={date}
              onChange={handleCustomChange}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Description"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Custom description or bullet points"
                value={descriptions}
                onChange={handleCustomChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[6.2rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
    </Form>
  );
};
