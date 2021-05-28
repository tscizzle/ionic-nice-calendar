import _ from "lodash";

/* Fetching */

export const NICE_SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:9000"
    : window.location.origin;

async function niceFetch(
  path: string,
  config?: RequestInit
): Promise<Response> {
  path = NICE_SERVER_URL + path;
  config = { credentials: "include", ...config };
  return fetch(path, config);
}

async function niceFetchJSON(path: string, config?: RequestInit): Promise<any> {
  return niceFetch(path, config).then((res) => res.json());
}

async function niceGET<T>(path: string): Promise<any> {
  return niceFetchJSON(path);
}

const getJSONHeaders = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

async function nicePOST<T>(path: string, body: object): Promise<any> {
  return niceFetchJSON(path, {
    method: "POST",
    headers: getJSONHeaders(),
    body: JSON.stringify(body),
  });
}

/* Transforming */

const dateify = ({
  obj,
  dateFieldPaths,
}: {
  obj: any;
  dateFieldPaths: string[];
}): any => {
  const newObj = _.cloneDeep(obj);
  _.each(dateFieldPaths, (path) => {
    const hasField = _.has(obj, path);
    if (hasField) {
      const stringVal = _.get(obj, path);
      const dateVal = new Date(stringVal);
      _.set(newObj, path, dateVal);
    }
  });
  return newObj;
};

/* API Calls */

const getLoggedInUser = (): Promise<{ user: any }> => {
  const path = "/loggedInUser?" + Math.random(); // the random number avoids using a cached response
  return niceGET(path).then(({ user }) => {
    const processedUser = dateify({
      obj: user,
      dateFieldPaths: ["createdAt", "updatedAt"],
    });
    return { user: processedUser };
  });
};

const login = ({ email, password }: { email: string; password: string }) => {
  return nicePOST("/login", {
    username: email,
    password,
  });
};

const logout = () => {
  return niceGET("/logout");
};

const register = ({ email, password }: { email: string; password: string }) => {
  return nicePOST("/register", {
    email,
    username: email,
    password,
  });
};

const initiateResetPassword = ({
  email,
  origin,
}: {
  email: string;
  origin: string;
}) => {
  return nicePOST("/initiateResetPassword", {
    email,
    origin,
  });
};

const resetPassword = ({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) => {
  return nicePOST(`/resetPassword/${token}`, {
    newPassword,
  });
};

const getEvents = ({ userId }: { userId: string }) => {
  return niceGET(`/get-events/${userId}`).then(({ events }) => {
    const processedEventMap = _.mapValues(events, (event) => {
      return dateify({
        obj: event,
        dateFieldPaths: ["datetime", "stopDatetime", "createdAt", "updatedAt"],
      });
    });
    return { events: processedEventMap };
  });
};

const upsertEvent = ({ event }: { event: any }) => {
  return nicePOST("/upsert-event", {
    eventId: event._id,
    userId: event.userId,
    updatedFields: event,
  });
};

const deleteEvent = ({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}) => {
  return nicePOST("/delete-event", {
    eventId,
    userId,
  });
};

const getOccurrences = ({ userId }: { userId: string }) => {
  return niceGET(`/get-occurrences/${userId}`).then(({ occurrences }) => {
    const processedOccurrencesMap = _.mapValues(occurrences, (event) => {
      return dateify({
        obj: event,
        dateFieldPaths: ["datetime", "createdAt", "updatedAt"],
      });
    });
    return { occurrences: processedOccurrencesMap };
  });
};

const upsertOccurrence = ({ occurrence }: { occurrence: any }) => {
  return nicePOST("/upsert-occurrence", {
    occurrenceId: occurrence._id,
    userId: occurrence.userId,
    updatedFields: occurrence,
  });
};

const deleteOccurrence = ({
  occurrenceId,
  userId,
}: {
  occurrenceId: string;
  userId: string;
}) => {
  return nicePOST("/delete-occurrence", {
    occurrenceId,
    userId,
  });
};

const api = {
  getLoggedInUser,
  login,
  logout,
  register,
  initiateResetPassword,
  resetPassword,
  getEvents,
  upsertEvent,
  deleteEvent,
  getOccurrences,
  upsertOccurrence,
  deleteOccurrence,
};

export default api;
