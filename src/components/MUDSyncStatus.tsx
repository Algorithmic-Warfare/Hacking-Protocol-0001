import { useMUDSync } from "../MUDSyncContext";
import { EveProgressBar, EveBox, EveSection } from "./elements/index";

const MUDSyncStatus = () => {
  const { progress, currentBlock, latestBlock, logCount, isSyncing } =
    useMUDSync();

  return (
    <div className="AbsoluteCenter">
      <EveBox>
        <EveSection sectionName={"Sync Progress"} />
        <div>
          <div className="flex flex-row justify-center">
            <div className="grow text-center">
              <p>Current Block</p>
              <p>{currentBlock?.toString() ?? "Loading..."}</p>
            </div>
            <div className="grow text-center">
              <p>Latest Block</p>
              <p>{latestBlock?.toString() ?? "Loading..."}</p>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="grow text-center">
              <p>Progress</p>
              <p>{progress.toFixed(2)}%</p>
            </div>
            <div className="grow text-center">
              <p>Logs Processed</p>
              <p>{logCount}</p>
            </div>
          </div>
        </div>

        <div className={"text-center"}>
          <p>{isSyncing ? "Syncing..." : "Fully Synced"}</p>
        </div>
        <EveProgressBar nominator={progress} denominator={100} label={""} />
      </EveBox>
    </div>
  );
};

export default MUDSyncStatus;
