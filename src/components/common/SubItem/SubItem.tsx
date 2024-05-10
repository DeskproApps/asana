import { useState, useCallback } from "react";
import { P5, Spinner, Checkbox } from "@deskpro/deskpro-ui";
import { Card } from "../Card";
import type { FC } from "react";
import type { Task } from "../../../services/asana/types";

export type Props = {
  item: Task,
  onComplete?: (itemId: Task["gid"], completed: boolean) => Promise<unknown>,
};

const SubItem: FC<Props> = ({ item, onComplete }) => {
  const boxSize = 14;
  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback(() => {
    if (onComplete && item?.gid) {
      setIsLoading(true);
      onComplete && onComplete(item.gid, !item?.completed).finally(() => setIsLoading(false));
    }
  }, [onComplete, item]);

  return (
    <Card>
      <Card.Media>
        {isLoading
          ? (
            <div style={{ width: `${boxSize}px`, height: `${boxSize}px` }}>
              <Spinner size="extra-small"/>
            </div>
          )
          : (
            <Checkbox
              id={item?.gid}
              size={boxSize}
              checked={Boolean(item?.completed)}
              onChange={onChange}
              disabled={!onComplete}
            />
          )
        }
      </Card.Media>
      <Card.Body size={boxSize}><P5>{item.name}</P5></Card.Body>
    </Card>
  );
};

export { SubItem };
