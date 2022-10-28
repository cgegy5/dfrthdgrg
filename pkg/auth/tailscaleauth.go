/*
Copyright 2022 The Perkeep Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package auth

import (
	"errors"
	"net/http"
)

func newTailscaleAuth(arg string) (AuthMode, error) {
	if arg != "full-access-to-tailnet" {
		return nil, errors.New("only 'full-access-to-tailnet' mode is currently supported")
	}
	return &tailscaleAuth{
		any: true,
	}, nil
}

type tailscaleAuth struct {
	any bool // whether all access is permitted to anybody in the tailnet
}

func (ta *tailscaleAuth) AllowedAccess(req *http.Request) Operation {
	// AddAuthHeader inserts in req the credentials needed
	// for a client to authenticate.
	// TODO: eventially use req.RemoteAddr to talk to Tailscale LocalAPI WhoIs method
	// and check caps.
	if ta.any {
		return OpAll
	}
	return 0
}

func (*tailscaleAuth) AddAuthHeader(req *http.Request) {
	// Nothing
}
