TMPDIR="/gisdata/temp/"
UNZIPTOOL=unzip
WGETTOOL="/usr/bin/wget"
export PGBIN=/usr/lib/postgresql/15/bin
export PGPORT=5432
export PGHOST=localhost
export PGUSER=postgres
# export PGPASSWORD=yourpasswordhere
export PGDATABASE=geocoder
PSQL=${PGBIN}/psql
SHP2PGSQL=shp2pgsql
cd /gisdata

cd /gisdata
wget https://www2.census.gov/geo/tiger/TIGER2022/PLACE/tl_2022_36_place.zip --mirror --reject=html
cd /gisdata/www2.census.gov/geo/tiger/TIGER2022/PLACE
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_2022_36*_place.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.NY_place(CONSTRAINT pk_NY_place PRIMARY KEY (plcidfp) ) INHERITS(tiger.place);" 
${SHP2PGSQL} -D -c -s 4269 -g the_geom   -W "latin1" tl_2022_36_place.dbf tiger_staging.ny_place | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.NY_place RENAME geoid TO plcidfp;SELECT loader_load_staged_data(lower('NY_place'), lower('NY_place')); ALTER TABLE tiger_data.NY_place ADD CONSTRAINT uidx_NY_place_gid UNIQUE (gid);"
${PSQL} -c "CREATE INDEX idx_NY_place_soundex_name ON tiger_data.NY_place USING btree (soundex(name));"
${PSQL} -c "CREATE INDEX tiger_data_NY_place_the_geom_gist ON tiger_data.NY_place USING gist(the_geom);"
${PSQL} -c "ALTER TABLE tiger_data.NY_place ADD CONSTRAINT chk_statefp CHECK (statefp = '36');"
cd /gisdata
wget https://www2.census.gov/geo/tiger/TIGER2022/COUSUB/tl_2022_36_cousub.zip --mirror --reject=html
cd /gisdata/www2.census.gov/geo/tiger/TIGER2022/COUSUB
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_2022_36*_cousub.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.NY_cousub(CONSTRAINT pk_NY_cousub PRIMARY KEY (cosbidfp), CONSTRAINT uidx_NY_cousub_gid UNIQUE (gid)) INHERITS(tiger.cousub);" 
${SHP2PGSQL} -D -c -s 4269 -g the_geom   -W "latin1" tl_2022_36_cousub.dbf tiger
