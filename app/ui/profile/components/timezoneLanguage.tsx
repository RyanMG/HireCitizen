import ProfileDetailsItem from "./profileDetailsItem";

export default function TimezoneLanguage({timezone, language}: {timezone: string, language: string}) {
  return (
    <div className="flex flex-row mt-4 gap-6">
      <ProfileDetailsItem label="Working Timezone" value={timezone} />
      <ProfileDetailsItem label="Primary Language" value={language} />
    </div>
  )
}
